package hu.szte.prf.prfpelda.models;

import java.util.List;

public interface ToDoService {
    void addToDo(ToDo todo);
    List<ToDo> getAllTodos();
    ToDo getToDoById(int id);
    void deleteToDoById(int id);
}
