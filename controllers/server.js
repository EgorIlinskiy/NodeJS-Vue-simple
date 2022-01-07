let data = [
    { id: "1", client: 'egor' },
    { id: '2', client: 'bob' }
]

export const getAll = (req, res) => {

    setTimeout(() => {
        return res.status(200).json(data)
    }, 1500)
}

export const create = (req, res) => {
    if(!req.body) return res.sendStatus(400);
    let newData = {
        id: Date.now().toString(),
        ...req.body
    }
    data.push(newData)
    res.status(201).json(newData)
}

export const remove = (req, res) => {
    data = data.filter(s => s.id !== req.params.id)
    res.json({ message: "item has been removed" })
}