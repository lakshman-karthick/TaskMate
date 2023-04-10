import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let todo

export default class todoDAO{
    static async injectDB(conn)
    {
        if(todo)
        {
            return
        }
        try{
            todo = await conn.db("todoList").collection("activities")
            console.log(todo)
        }catch(e)
        {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addToDoList(activity,status)
    {
        try{
            const todoDoc = {
                activity :activity,
                status :status,
            }
            console.log("Adding")
            return await todo.insertOne(todoDoc)
        }catch(e)
        {
            console.error(`Unable to post activity: ${e}`);
            return {error:e}
        }
    }

    static async getToDoList()
    {
        try{
         const getToDo = await todo.find({}).toArray()
         console.log(getToDo);
         return getToDo
        }catch(e)
        {
            console.error(`Unable to Get Activities: ${e}`)
            return {error:e}
        }
    }

    static async updateToDoList(id ,activity,status)
    {
        try{
            const updateToDo =await todo.updateOne(
                {_id:ObjectId(id)},
                {$set : {activity:activity,status:status}}
            )
            console.log(updateToDo);
            return updateToDo
        }catch(e)
        {
            console.error(`Unable to Update Activities: ${e}`)
            return {error:e}
        }
    }

    static async deleteToDoList(id)
    {
        try{
            const deleteToDo = await todo.deleteOne({
                _id:ObjectId(id),
            })
            return deleteToDo
        }catch(e)
        {
            console.error(`Unable to Delete Activities: ${e}`)
            return {error:e}
        }
    }
}