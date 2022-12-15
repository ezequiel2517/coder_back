import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.js";

export class Contenedor {
    constructor(model) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        this.model = model;
    }

    async save(item) {
        try {
            const db = admin.firestore();
            const model = db.collection(this.model);
            await model.add(item);
        }
        catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const db = admin.firestore();
            const model = db.collection(this.model);
            return await model.get();
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const db = admin.firestore();
            const model = db.collection(this.model);
            return await model.doc(id).get();
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const db = admin.firestore();
            const model = db.collection(this.model);
            await model.doc(id).delete();
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            const db = admin.firestore();
            const model = db.collection(this.model);
            await model.delete();
        } catch (error) {
            console.log(error);
        }
    }

    async modify(item) {
        const { id, ...rest } = item;
        item = rest;
        const db = admin.firestore();
        const model = db.collection(this.model);
        await model.doc(id).update(item);
    }
}