import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
} from "@material-ui/core";
import { NEW_CAMPAIGN } from "../../settings";

interface campaign {
  id: string;
  startDate: number;
  endDate: number;
  targetImpressions: number;
  deliveredImpressions: number;
}

interface Props {
  handleClose: () => void;
  Open: boolean;
}

const CreateCampaigns = (props: Props) => {
  const [selectedDate, handleDateChange] = useState(new Date());

  const [newcampaign, setNewCampaign] = useState<campaign>({
    id: uuidv4(),
    startDate: new Date().getMilliseconds(),
    endDate: new Date().getMilliseconds(),
    targetImpressions: 0,
    deliveredImpressions: 0,
  });

  const { Open, handleClose } = props;

  const handleSave = () => {
    axios
      .post(NEW_CAMPAIGN, JSON.stringify(newcampaign), {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-API-Key": "jEl7ITTfKa7OGXMlF1OZL7FU2FwCI33N275V0mD5",
        },
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((err) => {
        console.log("Err ", err);
      });
  };

  //useEffect(() => {});

  const OnkeyChangeEvent = (e: any) => {
    setNewCampaign({
      ...newcampaign,
      [e.target.name]: e.target.value,
    });
  };

  const OnDateEvent = (e: any) => {
    const enterdate = new Date(e.target.value);
    setNewCampaign({
      ...newcampaign,
      [e.target.name]: enterdate.getTime(),
    });
    alert(enterdate.getTime());
  };

  //alert(Newcampaign.startDate.toDate);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={Open}
    >
      <DialogTitle id="simple-dialog-title">Create Campaign</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sm={12}>
            <TextField name="id" value={newcampaign.id} label="Id" />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sm={12}>
            <TextField
              name="startDate"
              type="datetime-local"
              label="Start date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                OnDateEvent(e);
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sm={12}>
            <TextField
              id="outlined-helperText"
              name="endDate"
              type="datetime-local"
              label="End date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                OnDateEvent(e);
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sm={12}>
            <TextField
              name="targetImpressions"
              value={newcampaign.targetImpressions}
              label="Target Impressions"
              onChange={(e) => {
                OnkeyChangeEvent(e);
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sm={12}>
            <TextField
              name="deliveredImpressions"
              label="Delivered Impressions"
              value={newcampaign.deliveredImpressions}
              onChange={(e) => {
                OnkeyChangeEvent(e);
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} variant="contained" color="primary">
          Create
        </Button>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCampaigns;
