import * as http from "http";
import express from 'express';
import { newEnforcer, Enforcer } from 'casbin';

class CasbinService {
    private enforcer! : Enforcer;
    
    public async run() {
        // RBAC API doesn't support RBAC w/ domain.
        // this.enforcer = await newEnforcer('./src/__test__/example/rbac_with_domains_model.conf', './src/__test__/example/rbac_with_domains_policy.csv');
        this.enforcer = await newEnforcer('./src/__test__/example/rbac_model.conf', './src/__test__/example/rbac_policy.csv');
    }
    
    public async getProfiles(sub: string) : Promise<string> {
        const policies = await this.enforcer.getImplicitPermissionsForUser(sub);
        const profiles : { [key:string]: string[] } = {};
        policies.forEach(policy => {
            if (!(policy[2] in profiles)) {
                profiles[policy[2]] = [];
            }
            profiles[policy[2]].push(policy[1]);
        })
        return JSON.stringify(profiles);
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
