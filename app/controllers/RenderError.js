/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description Renderring error class
 */
class RenderError {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    renderError(error, code) {
        console.error(error);
        if (error.original && error.original.hint) {
            res.status(500).json({
                "error": error.message,
                "hint": error.original.hint
            });
        } else {
            res.status(code).json({
                "error": error.message
            });
        }
    }
}

module.exports = RenderError;