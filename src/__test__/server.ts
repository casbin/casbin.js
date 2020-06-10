import * as http from "http";
import express from 'express';
import { newEnforcer, Enforcer } from 'casbin';


class CasbinService {
    private enforcer! : Enforcer;
    
    public async run() {
        // this.enforcer = await newEnforcer('./src/__test__/example/rbac_with_domains_model.conf', './src/__test__/example/rbac_with_domains_policy.csv');
        this.enforcer = await newEnforcer('./src/__test__/example/rbac_model.conf', './src/__test__/example/rbac_policy.csv');
    }
    
    // TODO: Create an interface for getting all the policies
    public async getProfiles(sub: string) : Promise<string> {
        const policies = await this.enforcer.getImplicitPermissionsForUser(sub);
        // policies.forEach(policy => {
        //     policy[2]
        // })
        console.log(policies);
        return "123";
    }
}

class TestServer {
    private app: express.Application;
    private port = 4000;
    private listener!: http.Server;
    private casbinServ: CasbinService;
    public constructor(port?: number) {
        if (port) {
            this.port = port;
        }
        this.app = express();
        this.casbinServ = new CasbinService();
        
    }

    private async setRouter(): Promise<void> {
        this.app.get('/', (req: express.Request, res: express.Response) => {
            res.status(200).json({
                message: 'ok',
                data: 'this is the data'
            })
        });
        this.app.get('/api/casbin', async (req: express.Request, res: express.Response) => {
            const sub = String(req.query["casbin_subject"]);
            const policies = await this.casbinServ.getProfiles(sub);
            res.status(200).json({
                message: 'ok',
                data: policies
            })
        })
    }

    public async start() : Promise<void> {
        await this.casbinServ.run();
        await this.setRouter();
        this.listener = this.app.listen(this.port, () => console.log(`Express server is listening at http://localhost:${this.port}`));
    }

    public async terminate() : Promise<void> {
        this.listener.close();
        console.log('Express server is terminated');
    }
}

export default TestServer;
