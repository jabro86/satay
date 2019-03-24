import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import React from "react";

export const Dashboard: React.SFC = () => (
  <Card>
    <CardHeader title="Welcome" />
    <CardContent>This is your serverless admin application</CardContent>
  </Card>
);
