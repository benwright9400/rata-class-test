import { School, Send } from "@mui/icons-material";
import { Button, Card, CardContent, TextField, Slider, InputAdornment, IconButton, OutlinedInput } from "@mui/material";
import React, { useEffect, useState } from "react";

function MainPage() {
    const [question, setQuestion] = useState("");
    const [understanding, setUnderstanding] = useState(50);
    const [questions, setQuestions] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(()  => {
        if(count < 1) {
            setInterval(getQuestions, 2000);
            getQuestions();
            setCount(1);
        }
    });

    async function postUnderstanding(value) {
        let item = await fetch("https://rita-server.herokuapp.com/confidence", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: Math.round(Math.random()),
                confidence: value
            })
            });
        
        item = await item.json();
        
        console.log(item);
    }

    async function postQuestion() {
        let item = await fetch("https://rita-server.herokuapp.com/question", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: Math.round(Math.random()),
                question: question
            })
            });
            
        item = await item.json();
        
        console.log(item);
    }

    async function getQuestions() {
        let questions = await fetch("https://rita-server.herokuapp.com/questions");
        questions = await questions.json();
        
        setQuestions(questions.toReversed());
    }

    

    return (<div>
        <Card>
            <div className="flex items-center justify-center flex-auto">
                <School style={{scale: '1', margin: '0.5rem'}} />
                <h2 className="font-semibold font-xl" style={{padding: '1rem', paddingLeft: '0.5rem'}}>Rita</h2>
            </div>
        </Card>
        <div className="p-4 absolute top-1/4 bottom-0 left-0 right-0">
            <div className="grow-0">
                <Card>
                    <h3 className="font-semibold font-xl p-2 ">Confidence Slider</h3>
                    <div className="p-2 px-4">
                        <Slider
                            style={{margin: '1rem;'}}
                            valueLabelDisplay="auto"
                            step={10}
                            value={understanding}
                            marks
                            min={0}
                            max={100}
                            onChange={(event) => {
                                setUnderstanding(event.target.value);
                                postUnderstanding(event.target.value);
                            }}
                            />
                    </div>
                </Card>
            </div>
            <div className="grow">
                <Card className="mt-4">
                    <div className="p-2">
                        <div className="h-64 text-left overflow-y-scroll my-2 px-2">
                                {
                                    questions.map((question) => <p>{question.question}</p>)
                                }
                        </div>
                        <OutlinedInput size="small" style={{width: '100%'}}
                            autoComplete="off"
                            onChange={(event) => {
                                setQuestion(event.target.value);
                            }}
                            onKeyDown={(keyEvent) => {
                                if(keyEvent.keyCode===13) {
                                    postQuestion();
                                    setQuestion("");
                                }
                            }}
                            value={question}
                            endAdornment={<InputAdornment position="end">
                                <IconButton onClick={() => {
                                    postQuestion();
                                    setQuestion("");
                                }}><Send></Send></IconButton>
                            </InputAdornment>}>
                        </OutlinedInput>
                    </div>
                </Card>
            </div>
        </div>
        
    </div>);
}

export default MainPage;