import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  TextareaAutosize,
} from "@mui/material";
import axios from "axios";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
  {
    value: "los-angeles",
    label: "Los Angeles",
  },
];

export const AccountProfileDetails = () => {
  const question = {
    id: generateUUID(),
    question: "",
    difficulty: "Hard",
    time: Date.now(),
    solution: "",
    value: "",
  };
  const [forms, setForms] = useState([question]);
  const [values, setValues] = useState({
    prompt: "",
  });

  const handleFormChange = (event, index) => {
    const { name, value } = event.target;
    const newForms = [...forms];
    newForms[index][name] = value;
    setForms(newForms);
  };

  const handleAddForm = () => {
    setForms([...forms, question]);
  };
  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);
  function generateUUID() {
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return uuid;
  }

  // .post(`https://casperexp-production-caf4.up.railway.app/api/questions/add`, {

  const handleSubmit = () => {

    console.log(forms)
    axios
      .post(`https://casperexp-production-caf4.up.railway.app/api/questions/addPrompt`, {
        promptId: generateUUID(),
        prompt: values.prompt,
        questions: forms,
        category: "Hello",
        status: true,
      })
      .then(async (res) => {
        if (res.status === 201) {
          alert("Question Successfully Added");
          setForms([
            {
              id: "1",
              question: "",
              difficulty: "Hard",
              time: Date.now(),
              solution: "",
              value: "",
            },
          ]);
        }
      })
      .catch((err) => {
        alert(err);
      });

    console.log(values);
  };

  return (
    <div>
      <Card>
        <CardHeader subheader="The information can be edited"
title="Add Questions" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container
spacing={3}>
              <Grid xs={12}
md={12}>
                <TextField
                  fullWidth
                  helperText="Please add question here"
                  label="Prompt Title"
                  name="prompt"
                  onChange={handleChange}
                  required
                  value={values.prompt}
                />
              </Grid>
              {forms.map((data, i) => (
                <Grid
                  key={i}  
                xs={12}
                    md={12}>
                  <textarea
                    style={{ width: "100%", borderRadius: "10px", padding: "5px" }}
                    rows={7}
                    placeholder="add description here..."
                    label="Description"
                    name="question"
                    onChange={(event) => handleFormChange(event, i)}
                    required
                    value={data.question}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained"
onClick={handleAddForm}>
            Add More Questions
          </Button>
          <Button onClick={handleSubmit}
variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
