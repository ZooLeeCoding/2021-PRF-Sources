package hu.szte.prf.prfpelda.models;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ToDoServiceImpl implements ToDoService {

    ToDoRepository toDoRepository;

    @Autowired
    public ToDoServiceImpl(ToDoRepository toDoRepository) {
        this.toDoRepository = toDoRepository;
    }

    @Override
    public void addToDo(ToDo todo) {
        this.toDoRepository.save(todo);
        
    }

    @Override
    public List<ToDo> getAllTodos() {
       List<ToDo> list = this.toDoRepository.findAll();
       return list;
    }

    @Override
    public ToDo getToDoById(int id) {
        ToDo todo = this.toDoRepository.findById(id).get();
        return todo;
    }

    @Override
    public void deleteToDoById(int id) {
        this.toDoRepository.deleteById(id);
    }
    
}
