import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_ALL_CAMPAIGN } from "../../settings";
import CreateCampaigns from "../create";
import CampaignDetails from "../details";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

interface campaign {
  id: string;
  startDate: string;
  endDate: string;
  targetImpressions: number;
  deliveredImpressions: number;
}

const Home = () => {
  const [listData, SetListData] = useState([]);
  const [OpenPopup, setOpenPopup] = useState(false);
  const [OpenDetailPopup, setOpenDetailPopup] = useState(false);

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
        //alert(response.data);
        SetListData(response.data);
      });
  }, [OpenPopup]);

  const AddButtonClick = () => {
    setOpenPopup(true);
  };

  const DetailsButtonClick = () => {
    setOpenDetailPopup(true);
  };

  const ClostButtonClick = () => {
    setOpenPopup(false);
    setOpenDetailPopup(false);
  };

  return (
    <div style={{ margin: "10px" }}>
      <Grid container>
        <Grid item sm={2}>
          <Button variant="contained" color="primary" onClick={AddButtonClick}>
            ADD
          </Button>
        </Grid>
        <Grid item sm={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={DetailsButtonClick}
          >
            Status
          </Button>
        </Grid>
        <Grid item sm={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Target Impression</TableCell>
                  <TableCell>Delivery Impression</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listData
                  ? listData.map((camp: campaign, index) => (
                      <TableRow key={index}>
                        <TableCell>{camp.id}</TableCell>
                        <TableCell>
                          {new Date(camp.startDate).toDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(camp.endDate).toDateString()}
                        </TableCell>
                        <TableCell>{camp.targetImpressions}</TableCell>
                        <TableCell>{camp.deliveredImpressions}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
          {OpenPopup ? (
            <CreateCampaigns Open={OpenPopup} handleClose={ClostButtonClick} />
          ) : null}

          {OpenDetailPopup ? (
            <CampaignDetails
              Open={OpenDetailPopup}
              handleClose={ClostButtonClick}
            />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
