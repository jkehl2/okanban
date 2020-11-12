const { List } = require('../models');

// un objet d'options qu'on passera à toutes les méthode find...
const findOptions = {
    include: {all: true, nested: true},
    order: [
        // d'abord ranger les listes par positions croissantes
        ['position', 'ASC'],
        // puis dans chaque liste, ranger les cartes par positions croissantes
        ['cards', 'position', 'ASC']
    ]
};

const listController = {

    getAll: async (req, res, next) => {
        try {
            const lists = await List.findAll(findOptions);
            res.json( lists );
        } catch (error) {
            // ici quelque chose s'est mal passé...
            console.error(error);
            res.status(500).json( {
                "error": error.message,
                "hint": error.original.hint
            } );
        }
    },

    getOne: async (req, res, next) => {
        try {
            //1. récupérer l'id cible
            const listId = parseInt(req.params.id, 10);

            //2. récupérer la liste ciblée
            const list = await List.findByPk(listId,findOptions);

            //3. renvoyer, soit la liste, soit une erreur 404
            if (list) {
                res.json(list);
            } else {
                // on passe au MW suivant (le "404 not found")
                next();
            }
            
        } catch (error) {
            // ici quelque chose s'est mal passé...
            console.error(error);
            res.status(500).json( {
                "error": error.message,
                "hint": error.original.hint
            });
        }
    },

    create: async (req, res, next) => {
        try {

            // console.log(req.body);

            // on veut éviter qu'un utilisateur crée une liste avec un nom vide
            // Première solution : tester si req.body.name est vide !
            // if (!req.body.name) {
            //     res.status(400).json({
            //         "error": "name can not be empty"
            //     });
            // }

            // La deuxième solution, c'est de mieux définir les propriétés de nos models
            // et de laisser Sequelize faire le travail (cf models/list.js)

            // créer une nouvelle liste, en utilisant les infos de req.body
            // const newList = new List(req.body);
            // await newList.save();
            
            // Autre solution pour la création :utiliser les méthodes statiques des models
            // La doc de Sequelize suggère d'utiliser plutôt cette méthode : on suit les recommendations !
            const newList = await List.create(req.body);

            // lors d'une création (ça sera pareil sur un update),
            // le plus simple c'est de renvoyer l'instance qui vient d'être créée
            res.json(newList);
            
        } catch (error) {
            // ici quelque chose s'est mal passé...
            console.error(error);
            res.status(500).json( {
                "error": error.message
            });
        }
    },

    updateAll: async (req, res, next) => {
        try {

            // on veut update les listes depuis les infos du body
            const result = await List.update( req.body, {
                where: {}, // on ne trie pas, on update TOUT
                returning: true
            });

            // result[0] contient le nombre de List modifiées
            // et result[1] contient la liste des List modifiées
            // ici, on envoie la liste des instances modifiées
            res.json(result[1]);
            
        } catch (error) {
            // ici quelque chose s'est mal passé...
            console.error(error);
            res.status(500).json( {
                "error": error.message
            });
        }
    },

    updateOne: async (req, res, next) => {
        try {

            // première version, avec 2 requetes
            // 1. récupérer la liste ciblée
            // 2A. si elle n'existe pas => 404
            // 2B. si elle existe => mise à jour et on renvoie l'instance mise à jour
            const id = parseInt(req.params.id);
            const list = await List.findByPk(id);
            if (list) {
                await list.update(req.body);
                res.json(list);
            } else {
                next()
            }


            // Deuxième version : avec les statiques
            // cette version est un poil mieux optimisé (puisqu'on ne fait qu'une seule requete à la BDD)
            // mais elle est aussi plus compliquée à lire (et donc à modifier par le futur !)
            /**  
            const result = await List.update( req.body, {
                where: {
                    id: id
                }, // on ne trie pas, on update TOUT
                returning: true
            });
            // result[0] contient le nombre de List modifiées
            // et result[1] contient la liste des List modifiées
            // ici, on envoie le premier element de la liste des instances modifiées
            if (result[0] == 0) {
                // rien n'as été modifié, probablement parce que rien n'a été trouvé ! => 404
                next();
            } else {
                res.json( result[1][0] );
            }

            **/ 

            
        } catch (error) {
            // ici quelque chose s'est mal passé...
            console.error(error);
            res.status(500).json( {
                "error": error.message
            });
        }
    },

    deleteOne: async (req, res, next) => {
        try {
            // ici encore, 2 façon de faire : une avec des instances, l'autre avec une méthode statique
            
            // on ne va implémenter que la version statique
            const nbDestoyed = await List.destroy({
                where: {
                    id: req.params.id
                }
            });

            if (nbDestoyed === 0) {
                // si on a rien supprimé, c'est qu'on a pas trouvé la bonne list => 404
                next();
            } else {
                // si au moins une liste a été supprimée, on renvoie un petit message de vaidation
                res.json({message: "ok"});
            }
            
        } catch (error) {
            // ici quelque chose s'est mal passé...
            console.error(error);
            res.status(500).json( {
                "error": error.message
            });
        }
    }

}


module.exports = listController;