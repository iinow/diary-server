import express from 'express'

let router = express.Router()

router.get('/', (req, res) => {
  res.json({
    name: 'dhfkdhfkdhfk'
  })
})

export default router
