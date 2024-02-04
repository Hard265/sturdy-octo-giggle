import {
    ObservableMap,
    action,
    makeObservable,
    observable,
} from "mobx";
import _ from "lodash";
import { ThemeVariantsT, Themes } from "../types/theme";
import { ColorSchemeName } from "react-native";

class ConfigStore {
    theme: ThemeVariantsT = "system";

    constructor() {
        makeObservable(this, {
            theme: observable,
            scheme: action,
            setTheme: action,
        });
        this.theme = "system"; // Default theme
        this.init();
    }

    init() {
        this.setTheme("system");
    }

    setTheme(theme: ThemeVariantsT) {
        this.theme = theme;
    }

    scheme(colorScheme: ColorSchemeName) {
        return (this.theme === "system"
            ? colorScheme
            : this.theme) as unknown as "dark" | "light";
    }
}

export default new ConfigStore();
