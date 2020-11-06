# MON SUPER MCD
    CONTIENT, 0N LISTE, 11 CARTE:
    LISTE: listeId, nom, position
    :

    CARTE: carteId, titre, position, couleur
    LABELISE, 0N CARTE, 0N LABEL:
    LABEL: labelId, nom, description, couleur

# MON SUPER MLD

## Relation "list"

    list(id SERIAL, name TEXT, position INT)

## Relation "card"

    card(id SERIAL, title TEXT, color TEXT, position INT, listId#list(id))

## Relation "label"

    label(id SERIAL, name TEXT, description TEXT, color TEXT)

## Table de jointure (asso. many-to-many) "card_label" entre les relations card et label

    card_label(id SERIAL, cardId#card(id), labelId#label(id))