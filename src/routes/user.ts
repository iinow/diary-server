import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    name: 'dhfkdhfkdhfk',
  })
})

export default router
