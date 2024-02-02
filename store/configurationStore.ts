import { ObservableMap, makeObservable, observable } from "mobx";
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
        
    }
}
export default new ConfigurationStore();