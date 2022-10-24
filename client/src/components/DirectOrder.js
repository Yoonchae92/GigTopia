import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "./Typography";

import Header from "../view/Header";
import OrderForm from "../view/OrderForm";
import RFTextField from "../form/RFTextField";
import FormButton from "../form/FormButton";
import FormFeedback from "../form/FormFeedback";
import withRoot from "../withRoot";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function DirectOrder({ userInfo, token }) {
  console.log(userInfo);
  const [sent, setSent] = useState(false);
  const location = useLocation();
  const { worker_id } = location.state.worker;

  const navigate = useNavigate();

  React.useEffect(()=> {
    console.log("다이렉트오더의 유저 이미지", userInfo.image)
    console.log("로케이션스테이트의 자료", location.state)
  })

  const handleSubmit = async (values) => {
    setSent(true);
    const { title, deadline, compensation, content } = values;

    try {
      const res = await axios.post(
        `http://localhost:4000/orders/direct_order/${worker_id}`,
        {
          title: title,
          client_id: userInfo.client_id,
          worker_id: location.state.workerId,
          deadline: deadline,
          compensation: compensation,
          content: content,
          image: userInfo.image,
        },
        { headers: { authorization: token } }
      );
      if (res.status === 200) {
        window.alert("새로운 오더를 성공적으로 작성했습니다.");
        navigate(-1);
      } else {
        console.log("오더작성 실패");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <OrderForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Direct Order
          </Typography>
        </React.Fragment>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }}>
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 1 }}
            >
              <Field
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Title"
                margin="normal"
                name="title"
                required
                size="large"
              />
              <Field
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Deadline"
                margin="normal"
                name="deadline"
                required
                size="large"
              />
              <Field
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Compensation"
                margin="normal"
                name="compensation"
                required
                size="large"
              />
              <Field
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Content"
                margin="normal"
                name="content"
                required
                size="large"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Complete"}
              </FormButton>
            </Box>
          )}
        </Form>
      </OrderForm>
    </React.Fragment>
  );
}

export default withRoot(DirectOrder);
