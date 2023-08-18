const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { v4: uuidv4 } = require("uuid");

app.use(bodyParser.json());
app.use(cors());
app.get("/delegations", function (req, res) {
  res.send([
    {
      ordinalNumber: 0,
      nameSurname: "John Doe",
      dateFrom: new Date(2023, 7, 10),
      dateTo: new Date(2023, 7, 11),
      startLocation: "San Francisco CA",
      stopLocation: "Los Angeles CA",
    },
    {
      ordinalNumber: 1,
      nameSurname: "John Doe",
      dateFrom: new Date(2023, 7, 11),
      dateTo: new Date(2023, 7, 12),
      startLocation: "Los Angeles CA",
      stopLocation: "San Francisco CA",
    },
    {
      ordinalNumber: 2,
      nameSurname: "John Doe",
      dateFrom: new Date(2023, 7, 12),
      dateTo: new Date(2023, 7, 13),
      startLocation: "San Francisco CA",
      stopLocation: "Los Angeles CA",
    },
    {
      ordinalNumber: 3,
      nameSurname: "John Doe",
      dateFrom: new Date(2023, 7, 13),
      dateTo: new Date(2023, 7, 14),
      startLocation: "Los Angeles CA",
      stopLocation: "San Francisco CA",
    },
    {
      ordinalNumber: 4,
      nameSurname: "John Doe",
      dateFrom: new Date(2023, 7, 14),
      dateTo: new Date(2023, 7, 15),
      startLocation: "San Francisco CA",
      stopLocation: "Los Angeles CA",
    },
    {
      ordinalNumber: 5,
      nameSurname: "John Doe",
      dateFrom: new Date(2023, 7, 15),
      dateTo: new Date(2023, 7, 16),
      startLocation: "Los Angeles CA",
      stopLocation: "San Francisco CA",
    },
    {
      ordinalNumber: 6,
      nameSurname: "John Doe",
      dateFrom: new Date(2023, 7, 16),
      dateTo: new Date(2023, 7, 17),
      startLocation: "San Francisco CA",
      stopLocation: "Los Angeles CA",
    },
  ]);
});

const contractors = [];
const Contractor = function (
  name = "example contractor s.a.",
  nip = "7592077996",
  regon = "737926681",
  isVatPayer = true,
  dateOfCreation = new Date(),
  street = "Wallstreet",
  buildingNumber = "1",
  apartmentNumber = "1000",
  comments = "example company with default values"
) {
  this.id = uuidv4();
  this.name = name;
  this.nip = nip;
  this.regon = regon;
  this.isVatPayer = isVatPayer;
  this.dateOfCreation = dateOfCreation;
  this.street = street;
  this.buildingNumber = buildingNumber;
  this.apartmentNumber = apartmentNumber;
  this.comments = comments;
  this.isDeleted = false;
};

for (let i = 0; i < 6; i++) {
  contractors.push(new Contractor(`Example contractor ${i}`));
}

const getOnlyNotDeletedContractors = () =>
  contractors.filter((contractor) => !contractor.isDeleted);
app.get("/contractors", function (req, res) {
  res.send(getOnlyNotDeletedContractors());
});
app.post("/contractors", function (req, res) {
  const {
    name,
    nip,
    regon,
    isVatPayer,
    dateOfCreation,
    street,
    buildingNumber,
    apartmentNumber,
    comments,
  } = req.body;
  const newContractor = new Contractor(
    name,
    nip,
    regon,
    isVatPayer,
    dateOfCreation,
    street,
    buildingNumber,
    apartmentNumber,
    comments
  );
  contractors.push(newContractor);
  res.send(getOnlyNotDeletedContractors());
});
app.put("/contractors/:id", function (req, res) {
  const contractorId = req.params.id;

  const {
    name,
    nip,
    regon,
    isVatPayer,
    dateOfCreation,
    street,
    buildingNumber,
    apartmentNumber,
    comments,
  } = req.body;
  const contractorIndex = contractors.findIndex(
    (contractor) => contractor.id == contractorId
  );

  const { id, isDeleted } = contractors[contractorIndex];

  const newContractor = {
    id,
    name,
    nip,
    regon,
    isVatPayer,
    dateOfCreation,
    street,
    buildingNumber,
    apartmentNumber,
    comments,
    isDeleted,
  };
  contractors[contractorIndex] = newContractor;
  res.send(getOnlyNotDeletedContractors());
});
app.delete("/contractors/:id", function (req, res) {
  const contractorId = req.params.id;
  const contractorIndex = contractors.findIndex(
    (contractor) => contractor.id === contractorId
  );
  contractors[contractorIndex].isDeleted = true;
  res.send(getOnlyNotDeletedContractors());
});
app.listen(5000);
