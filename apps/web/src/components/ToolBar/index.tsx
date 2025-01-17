import React from "react";

// import css from "./toolbar.module.sass";

const css = {wrap: ""}

const ToolBar = ({children}) => {
    return(
        <div className={css.wrap}>
            {children}
        </div>
    );
}

export default ToolBar;