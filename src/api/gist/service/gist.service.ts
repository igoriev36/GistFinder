import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
/* Promise based HTTP client for the browser and node.js */
const axios = require('axios');
const Gists = require('gists');
import Cache from 'cache-manager';
import { ConfigInterface } from 'src/config/interface/config.interface';



@Injectable()
export class GistService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache | any,
        private readonly configInterface:ConfigInterface
    ) { }

    async publicGists(username: string) {
        try {
            let date: any = new Date();
            const gists = new Gists({
                username: this.configInterface.USERNAME,
                password: this.configInterface.PASSWORD
            });

            if (await this.cacheManager.get(username)) {
                const gist = await gists.list(username, { since: date });
                // fs.writeFile('userlist.json', JSON.stringify(gist), 'utf8');
                return gist.body
            }
            else {
                const gist = await gists.list(username);
                await this.cacheManager.set(username, date.toISOString(), { ttl: 22000 });
            }




        } catch (error) {
            console.log(error)
            throw new Error('Error while getting Public Gists From User' + error)
        }
    }
}
