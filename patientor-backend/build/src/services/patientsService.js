"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_1.default;
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};
const addEntry = (entry) => {
    const newPatient = Object.assign({ id: uuid_1.v4(), entries: [] }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
const addPatientEntry = (pid, newData) => {
    const newEntry = Object.assign({ id: uuid_1.v4() }, newData);
    const patient = patients_1.default.find(p => p.id === pid);
    if (!patient)
        throw new Error(`patient with id ${pid} not found`);
    patient.entries.push(newEntry);
    return patient;
};
exports.default = {
    getEntries,
    addEntry,
    getNonSensitiveEntries,
    addPatientEntry,
};
