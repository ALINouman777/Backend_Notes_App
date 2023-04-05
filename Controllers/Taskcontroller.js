import Task from "../Database/model/Task.js"

export const addTask = async (req, res) => {
    try {
        const { title, description } = req.body
        if (!title || !description) {
            return res.status(404).json({
                success: false,
                message: "title or description must not be empty"
            })
        }

        const task = await Task.create({
            user: req.user._id, title, description
        })
        return  res.status(200).json({
            success: true,
            message: "successfully added task",
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const fetchmyNotes = async (req, res) => {

    try {

        const userid = req.user._id
        const task = await Task.find({ user: userid })
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Not found"
            })
        }

        return res.status(200).json({
            success: true,
            task
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internat Server Error"
        })
    }
}

export const deleteNote = async (req, res) => {
    const deltask = await Task.findById(req.params.id);
    if (!deltask) {
        return res.status(404).json({
            success: false,
            message: "Not found"
        })
    }
    await deltask.deleteOne();


    return res.status(200).json({
        success: true,
        message: "deleted successfully"
    })
}

export const updateNote = async (req, res) => {
    try {

        const taskid = req.params.id
        let task = await Task.findById(taskid)
        const { title, description } = req.body;

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "No notes avaliable"
            })
        }

        if (title) {
            task.title = title
        }
        if (description) {
            task.description = description
        }

        const newtask = await Task.findOneAndUpdate({ _id: req.params.id }, { $set: task }, { new: true })

        if (!newtask) {
            return res.status(406).json({
                success: false,
                message: "Fail to update"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Notes updates successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internat Server Error"
        })
    }
}