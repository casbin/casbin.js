const express = require('express');

class TestServer {
    private app: any;
    private port = 4000;
    private listener: any;
    public constructor(port?: number) {
        if (port) {
            this.port = port;
        }
    }
    public start() {
        this.app = express();
        this.app.get('/', (req: any, res: any) => {
            res.status(200).json({
                message: 'ok',
                data: 'this is the data',
            });
        });
        this.listener = this.app.listen(this.port, () => console.log(`Express server is listening at http://localhost:${this.port}`));
    }
    public terminate() {
        this.listener.close();
        console.log('Express server is terminated');
    }
}

export default TestServer;
