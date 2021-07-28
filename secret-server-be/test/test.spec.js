const { expect, assert } = require('chai')
const { describe, before, it } = require('mocha')
const request = require('supertest')
const express = require('express')
require('dotenv').config()

const startDb = require('../src/db')
const { logIt, secrets } = require('../src/utils')

let app
let mongo
describe('SECRET SERVER API TEST', () => {
    before(async () => {
        const { mongo: mongoConnect } = await startDb({ logIt })
        mongo = mongoConnect

        const router = require('../src/routes')({ mongo, logIt, secrets })

        app = express()
        app.use(express.json())
        app.use('/', router)
    })
    beforeEach(async () => {
        if ([...await mongo.db.listCollections().toArray()].filter(coll => coll.name === 'hashes').length > 0)
            await mongo.db.dropCollection('hashes')
    })
    describe('POST secret', async () => {
        it('remainingViews should be 1\nexpireAfterViews should be 1\nexpiresAt should be a date ', async () => {
            const res = await request(app).post('/secret').set('Accept', 'application/json').send({
                "secret": "super secret test",
                "expireAfterViews": 1,
                "expireAfter": 1
            })

            expect(res.body).to.be.an('object')
                .contains({ expireAfterViews: 1 })
                .contains({ remainingViews: 1 })
                .to.haveOwnProperty('expiresAt')
                .to.be.a('string')
        })

        it('remainingViews should be null\nexpireAfterViews should be null\nexpiresAt should be null ', async () => {
            const res = await request(app).post('/secret').set('Accept', 'application/json').send({
                "secret": "super secret test",
                "expireAfterViews": 0,
                "expireAfter": 0
            })

            expect(res.body).to.be.an('object')
                .contains({ expireAfterViews: 0 })
                .contains({ expiresAt: null })
                .contains({ remainingViews: null })
        })

        it('should be an error because of input type', async () => {
            const res = await request(app).post('/secret').set('Accept', 'application/json').send({
                "secret": 10,
                "expireAfterViews": 0,
                "expireAfter": 0
            })

            expect(res.error)
                .contains({ text: '{"message":"\\"secret\\" must be a string"}' })
                .contains({ status: 400 })
        })
    })

    describe('GET secret', () => {
        it('shoud get the entry properly', async () => {
            const postResult = await request(app).post('/secret').set('Accept', 'application/json').send({
                "secret": "super secret test",
                "expireAfterViews": 1,
                "expireAfter": 1
            })


            const res = await request(app).get(`/secret/${postResult.body.hash}`)
            expect(res.body).haveOwnProperty('hash').to.be.a('string')
            expect(res.body).contains({ secretText: "super secret test" })
        })
        it('shoud get 404', async () => {
            const postResult = await request(app).post('/secret').set('Accept', 'application/json').send({
                "secret": "super secret test",
                "expireAfterViews": 1,
                "expireAfter": 1
            })

            const res = await request(app).get(`/secret/randomFalseParam`)
            expect(res.error)
                .contains({ text: '{"message":"Secret not found"}' })
                .contains({ status: 404 })
        })
    })
    describe('test expireAfterViews', () => {
        it('shoud get the entry properly and then 404', async () => {
            const postResult = await request(app).post('/secret').set('Accept', 'application/json').send({
                "secret": "super secret test",
                "expireAfterViews": 1,
                "expireAfter": 1
            })

            const res = await request(app).get(`/secret/${postResult.body.hash}`)
            expect(res.body).haveOwnProperty('hash').to.be.a('string')
            expect(res.body).contains({ secretText: "super secret test" })

            const resAfterExpired = await request(app).get(`/secret/${postResult.body.hash}`)
            expect(resAfterExpired.error)
                .contains({ text: '{"message":"Secret not found"}' })
                .contains({ status: 404 })
        })
    })
    describe('test TTL', () => {
        it('shoud get the entry properly and then 404', async () => {
            const postResult = await request(app).post('/secret').set('Accept', 'application/json').send({
                "secret": "super secret test",
                "expireAfterViews": 0,
                "expireAfter": 1
            })

            const res = await request(app).get(`/secret/${postResult.body.hash}`)
            expect(res.body).haveOwnProperty('hash').to.be.a('string')
            expect(res.body).contains({ secretText: "super secret test" })

            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, 80000)
            })

            const resAfterExpired = await request(app).get(`/secret/${postResult.body.hash}`)
            expect(resAfterExpired.error)
                .contains({ text: '{"message":"Secret not found"}' })
                .contains({ status: 404 })
        }).timeout(100000)
    })

})