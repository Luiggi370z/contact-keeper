import { Router } from 'express'
import { check, validationResult } from 'express-validator'
import { Contact } from '../models/Contact'

const router = Router()

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    })
    res.json(contacts)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
})

const newContactValidation = [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
]
// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', [newContactValidation], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { name, email, phone, type, avatarUrl, gender } = req.body

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      avatarUrl,
      gender,
      user: req.user.id,
    })

    const contact = await newContact.save()

    res.json(contact)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
})

// @route   PUT api/contacts
// @desc    Update contact
// @access  Private
router.put('/:id', async (req, res) => {
  const { name, email, phone, type } = req.body

  const contactFields = {}
  if (name) contactFields.name = name
  if (email) contactFields.email = email
  if (phone) contactFields.phone = phone
  if (type) contactFields.type = type

  try {
    let contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ msg: 'Contact not found' })

    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' })

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true },
    )

    res.json(contact)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
})

// @route   DELETE api/contacts
// @desc    Delete existing contact
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ msg: 'Contact not found' })

    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' })

    await Contact.findByIdAndRemove(req.params.id)

    res.json({ msg: 'Contact removed' })
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
})

export default router
