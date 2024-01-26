import { ObservableMap, makeObservable, observable } from "mobx";
import databaseAdapter from "./databaseAdapter";
import _ from "lodash";

type ConfigurationsT = {
    theme?: "dark" | "light" | "system";
}

class ConfigurationStore {
    configurations: ConfigurationsT = {

    };

    constructor() {
        makeObservable(this, {
            configurations: observable
        })
    }

    async loadConfiguration() {
        await databaseAdapter.database.transactionAsync(async (tx) => {
            const results = (await tx.executeSqlAsync("SELECT * FROM configurations")).rows as unknown as ConfigurationsT;
            _.merge(this.configurations, results);
        })
    }
}
export default new ConfigurationStore();