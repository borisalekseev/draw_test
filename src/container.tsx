import React from "react";


export const GraphContainer: React.FC<React.PropsWithChildren> = ({children}) => (
    <div style={{
        display: "flex",
        position: "relative",
        height: "100%",
        overflow: "hidden",
        minHeight: "600px",
        maxHeight: "98%",
        border: "3px solid #6ea8fe",
        borderRadius: "0.5rem",
        marginTop: "5px",
        marginBottom: "5px",
        padding: "15px",
        
        alignItems: 'center', justifyContent: 'center'
    }}>
        {children}
    </div>
)