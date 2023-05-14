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
export function generateUUID() {
  const hexDigits = "0123456789abcdef";
  let uuid = "";
  for (let i = 0; i < 32; i++) {
    const randomDigit = Math.floor(Math.random() * 16);
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-";
    }
    uuid += hexDigits[i === 12 ? 4 : i === 16 ? (randomDigit & 3) | 8 : randomDigit];
  }
  return uuid;
}
export const SettingsPassword = () => {
  const question = {
    question: "",
    id: generateUUID(),
    difficulty: "Easy",
    time: Date.now(),
    solution: "",
    value: "",
  };
  const [forms, setForms] = useState([question]);
  const [values, setValues] = useState({
    prompt: "",
    time: "",
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

  const handleSubmit = () => {
    axios
      .post(`https://casperexp-production-caf4.up.railway.app/api/contest/add`, {
        contestId: generateUUID(),
        time: new Date(values.time).getTime(),
        questions: forms,
      })
      .then(async (res) => {
        if (res.status === 201) {
          alert("Contest Successfully Added");
          // setPrompt();
          setForms([
            {
              question: "",
              difficulty: "",
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
        <CardHeader subheader="The information can be edited" title="Add Contests" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={12}>
                <TextField
                  fullWidth
                  helperText="Please add question here"
                  label="Contest Title"
                  name="prompt"
                  onChange={handleChange}
                  required
                  value={values.prompt}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <TextField
                  fullWidth
                  helperText="Select Date"
                  name="time"
                  type="datetime-local"
                  onChange={handleChange}
                  required
                  value={values.time}
                />
              </Grid>
              {forms.map((data, i) => (
                <>
                  <Grid xs={12} md={12}>
                    <textarea
                      style={{ width: "100%", borderRadius: "10px", padding: "5px" }}
                      rows={7}
                      placeholder="enter question here..."
                      label="Description"
                      name="question"
                      onChange={(event) => handleFormChange(event, i)}
                      required
                      value={data.question}
                    />
                  </Grid>
                </>
              ))}
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleAddForm}>
            Add More Questions
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
