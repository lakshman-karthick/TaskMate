import ToDoDAO from '../dao/todoDAO.js'
export default class ToDoListController{
       static async apiPostToDo(req,res,next){
           try{
              const activity = req.body.activity;
              const status = req.body.status;
              const todoResponse = await ToDoDAO.addToDoList(
                activity,
                status,
              )
              console.log(todoResponse);
              res.json({ status: "success" })
           }catch(e){
              res.status(500).json({error:e.message});
           }
       }

       static async apiGetToDo(req, res, next) {
            try {
                let list = await ToDoDAO.getToDoList()
                if (!list) {
                    res.status(404).json({ error: "Not found" })
                    return
                }
                res.json(list)
                } catch (e) {
                console.log(`api, ${e}`)
                res.status(500).json({ error: e })
            }
      }

      static async apiPutToDo(req,res,next)
      {
        try{
            const id = req.params.id;
            const activity = req.body.activity;
            const status = req.body.status;
            const todoResponse = await ToDoDAO.updateToDoList(
                id,
                activity,
                status
            )

            var {error} = todoResponse
            if(error)
            {
                res.status(400).json({ error })
            }
            if (todoResponse.modifiedCount === 0) {
                throw new Error(
                  "unable to update ToDo List",
                )
              }
        
              res.json({ status: "success" })
        }
        catch(e)
        {
            res.status(500).json({error:e.message});
        }
      }


    static async apiDeleteToDo(req,res,next)
    {
        try{
        const id = req.params.id;
        const todoResponse = await ToDoDAO.deleteToDoList(id)
        res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}