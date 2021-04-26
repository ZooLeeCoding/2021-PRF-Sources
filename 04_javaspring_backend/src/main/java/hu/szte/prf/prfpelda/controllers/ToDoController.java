package hu.szte.prf.prfpelda.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hu.szte.prf.prfpelda.models.ToDo;
import hu.szte.prf.prfpelda.models.ToDoService;

@RestController
@RequestMapping
public class ToDoController {

    ToDoService toDoService;

    @Autowired
    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping("/")
    public String helloWorld() {
        return "Hello World!";
    }

    @PostMapping(path="/todo", consumes = "application/json")
    public String newToDo(@RequestBody ToDo todo) {
        try {
            this.toDoService.addToDo(todo);
            return "Success";
        } catch (Exception e) {
            System.out.println(e);
            return "Error during the create operation";
        }
    }

    @GetMapping("/todos")
    public List<ToDo> getAllToDo() {
        try {
            return this.toDoService.getAllTodos();
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/todo")
    public ToDo getToDoById(@RequestParam int id) {
        try {
            return this.toDoService.getToDoById(id);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @DeleteMapping("/todo")
    public String deleteToDoById(@RequestParam int id) {
        try {
            this.toDoService.deleteToDoById(id);
            return "Delete Successful";
        } catch (Exception e) {
            System.out.println(e);
            return "Error during deletion";
        }
    }
    
}
