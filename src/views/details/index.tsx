import React, { useState, useEffect } from "react";
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
import { GET_CAMPAIGN, GET_ALL_CAMPAIGN } from "../../settings";

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

const CampaignDetails = (props: Props) => {
  const [selectedData, handleDataChange] = useState<campaign>({
    id: "",
    startDate: 0,
    endDate: 0,
    targetImpressions: 0,
    deliveredImpressions: 0,
  });
  const [listData, SetListData] = useState([]);

  const { Open, handleClose } = props;
  useEffect(() => {
    axios
      .get(GET_ALL_CAMPAIGN, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-API-Key": "jEl7ITTfKa7OGXMlF1OZL7FU2FwCI33N275V0mD5",
        },
      })
      .then((response) => {
        SetListData(response.data);
      });
  }, []);

  const OnchangeDropdown = (eventData: any) => {
    axios
      .get(GET_CAMPAIGN + eventData.target.value, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-API-Key": "jEl7ITTfKa7OGXMlF1OZL7FU2FwCI33N275V0mD5",
        },
      })
      .then((response) => {
        handleDataChange(response.data);
      });
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={Open}
    >
      <DialogTitle id="simple-dialog-title">Details Campaign</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sm={12}>
            <select onChange={OnchangeDropdown}>
              {listData.map((camp: campaign, index) => (
                <option value={camp.id}>{camp.id} </option>
              ))}
            </select>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sm={12}>
            <TextField
              name="startDate"
              label="Start date"
              InputLabelProps={{
                shrink: true,
              }}
              value={selectedData.startDate}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sm={12}>
            <TextField
              id="outlined-helperText"
              name="endDate"
              label="End date"
              InputLabelProps={{
                shrink: true,
              }}
              value={selectedData.endDate}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sm={12}>
            <TextField
              name="targetImpressions"
              value={selectedData.targetImpressions}
              label="Target Impressions"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sm={12}>
            <TextField
              name="deliveredImpressions"
              label="Delivered Impressions"
              value={selectedData.deliveredImpressions}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CampaignDetails;
