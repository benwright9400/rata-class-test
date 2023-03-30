import { School, Send } from "@mui/icons-material";
import { Button, Card, CardContent, TextField, Slider, InputAdornment, IconButton, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import MainPage from "./MainPage";

function Setup() {
    const [stage, setStage] = useState(0);

    return loadContent(stage, stage, setStage);
}

function loadContent(stageNumber, stage, setStage) {
    if(stageNumber === 0) {
        return (<div>
            <School style={{scale: '4', marginTop: '20%', marginBottom: '2rem'}} />
            <h1 className="font-sans text-3xl font-semibold mb-2">Welcome to Rita</h1>
            <button variant="outlined" color="success" className="text-gray-100 m-4 px-4 py-2 bg-red-800 rounded hover:bg-red-700" onClick={() => {setStage(stage + 1)}}>Continue</button>

        </div>);
    }
    if(stageNumber === 1) {
        return (<div style={{width: 'fit-content', margin: 'auto', marginTop: '20%'}}>

                <h3 className="font-sans text-xl font-semibold mb-4">Enter your name</h3>
                <TextField size="small" placeholder="Name" />
                <br></br>
                <button variant="outlined" color="success" className="text-gray-100 m-4 px-4 py-2 bg-red-800 rounded hover:bg-red-700" onClick={() => {setStage(stage + 1)}}>Continue</button>

    </div>);
    }
    if(stageNumber === 2) {
        return <MainPage />;
    }
    return <div>End</div>;
}

export default Setup;