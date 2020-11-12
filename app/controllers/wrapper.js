/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description Wrapper module class
 */
class Wrapper {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    doSomething(callBack) {
        try {
            callBack();
        } catch (error) {
            error => this.renderError(error, 500);
        }
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

module.exports = Wrapper;