import admin from "firebase-admin";

export class Contenedor {
    constructor(model) {
        this.model = model;
    }

    async save(item) {
        try {
            const db = admin.firestore();
            const model = db.collection(this.model);
            const docRef = await model.add(item);
            return docRef.id;
        }
        catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const db = admin.firestore();
            const model = db.collection(this.model);
            const res = await model.get();
            const data = res.docs;
            return data.map((item) => {
                return { ...item.data(), id: item.id };
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const db = admin.firestore();
            const model = db.collection(this.model);
            const res = await model.doc(id).get();
            return {...res.data(), id}; 
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const db = admin.firestore();
            const model = db.collection(this.model);
            await model.doc(id).delete();
            return id;
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
        return id;
    }
}