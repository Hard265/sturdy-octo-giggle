import * as Color from "./colors";

const Themes = {
    light: {
        text: Color.TEXT,
        background: Color.BACKGROUND,
        primary: Color.PRIMARY,
        surface: Color.SURFACE,
        onbackground: Color.ON_BACKGROUND,
        onsurface: Color.ON_SURFACE,
        onprimary: Color.ON_PRIMARY,
        border: Color.BORDER,
        error: Color.ERROR,
        onerror: Color.ON_ERROR,
        success: Color.SUCCESS,
        onsuccess: Color.ON_SUCCESS,
        warning: Color.WARNING,
        onwarning: Color.ON_WARNING
    },
    dark: {
        text: Color.DARK_TEXT,
        background: Color.DARK_BACKGROUND,
        primary: Color.DARK_PRIMARY,
        surface: Color.DARK_SURFACE,
        onbackground: Color.DARK_ON_BACKGROUND,
        onsurface: Color.DARK_ON_SURFACE,
        onprimary: Color.DARK_ON_PRIMARY,
        border: Color.DARK_BORDER,
        error: Color.DARK_ERROR,
        onerror: Color.DARK_ON_ERROR,
        success: Color.DARK_SUCCESS,
        onsuccess: Color.DARK_ON_SUCCESS,
        warning: Color.DARK_WARNING,
        onwarning: Color.DARK_ON_WARNING
    }
}

export default Themes;