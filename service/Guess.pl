:- module(guess, [
    clear_visited_boards/0,
    clear_goal_found/0,
    set_board_as_visited/1,
    is_board_visited/1,
    save_total_colum/1,
    save_total_row/1,
    get_total_colum/1,
    get_total_row/1,
    board_row_size/3,
    board_total_rows/2,
    create_board_from_list/2,
    convert_board_to_list/2,
    generate_new_board_id/1,
    clear_all_boards/0,
    clear_board/1,
    clone_board/2,
    add_row_to_board/2,
    update_board_row/3,
    add_empty_to_board/3,
    get_valid_move/3,
    valid_move/4,
    apply_move_to_board/2,
    apply_horizontal_move/2,
    apply_vertical_move/2,
    generate_child_board/3,
    goal_row/2,
    goal_reached/1,
    start_astar/1,
    test_astar/5,
    astar/1,
    goal_search/1,
    goal_achieved/3,
    process_board/5,
    expand_children/6,
    display_search_state/1,
    board_row/3
]).

:-use_module(utiles, [
    zip/3,
    enumerate/2,
    index_of/3,
    new_id/2,
    list_split/4,
    list_set_value/4,
    list_at/3,
    list_swap/4,
    swap_vertical/5
]).
:-use_module(heuristic_astar, [
    manhattan_distance/3,
	heuristic/2, 
	current_position/3
]).
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:- dynamic visited_board/1.
:- dynamic goal_found/0.
:- dynamic goal_metrics/4.
:- dynamic heuristic/1. 

clear_visited_boards :-
    retractall(visited_board(_)).

clear_goal_found :-
    retractall(goal_found).

set_board_as_visited(BoardId) :-
    convert_board_to_list(BoardId, List),
    term_hash(List, HashId),
    assert(visited_board(HashId)).

is_board_visited(BoardId) :-
    convert_board_to_list(BoardId, List),
    term_hash(List, HashId),
    visited_board(HashId).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:- dynamic(total_colum/1).
:- dynamic(total_row/1).

save_total_colum(X) :-
    retractall(total_colum(_)),
    assert(total_colum(X)).

save_total_row(X) :-
    retractall(total_row(_)),
    assert(total_row(X)).	

get_total_colum(X) :-
    total_colum(X).

get_total_row(X) :-
    total_row(X).
	
board_row_size(BoardId, RowIndex, Size) :-
    board_row(BoardId, RowIndex, Row),
    length(Row, Size),
	save_total_colum(Size).
	
board_total_rows(BoardId, TotalRows) :-
    findall(RowIndex, board_row(BoardId, RowIndex, _), Rows),
    length(Rows, TotalRows),
	save_total_row(TotalRows).
	
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

create_board_from_list(List, BoardId) :-
    generate_new_board_id(BoardId),
    clear_board(BoardId),
    enumerate(List, EnumeratedList),
    forall(member(Row, EnumeratedList), add_row_to_board(BoardId, Row)),
	board_total_rows(BoardId, _),
	board_row_size(BoardId, 1, _).

convert_board_to_list(BoardId, List) :-
    findall(Row, (board_row(BoardId, _, Row)), List).

:- dynamic board_row/3.
:- dynamic board_empty/3.

generate_new_board_id(BoardId) :- new_id('board_', BoardId).

clear_all_boards :-
    retractall(board_row(_, _, _)),
    retractall(board_empty(_, _, _)).

clear_board(BoardId) :-
    retractall(board_row(BoardId, _, _)),
    retractall(board_empty(BoardId, _, _)).

clone_board(BoardId, ClonedBoardId):-
    findall([RowId, Row], board_row(BoardId, RowId, Row), EnumeratedList),
    generate_new_board_id(ClonedBoardId),
    forall(member(RowClone, EnumeratedList), add_row_to_board(ClonedBoardId, RowClone)),
    board_empty(BoardId, EmptyRow, EmptyCol),
    add_empty_to_board(ClonedBoardId, EmptyRow, EmptyCol).

add_row_to_board(BoardId, [RowIndex, Row]) :-
    assert(board_row(BoardId, RowIndex, Row)),
    ( index_of(empty, Row, EmptyIndex) -> add_empty_to_board(BoardId, RowIndex, EmptyIndex) ; true ).

update_board_row(BoardId, RowIndex, UpdatedRow) :-
    retract(board_row(BoardId, RowIndex, _)),
    add_row_to_board(BoardId, [RowIndex, UpdatedRow]).

add_empty_to_board(BoardId, RowIndex, ColIndex) :-
    retractall(board_empty(BoardId, _, _)),
    assert(board_empty(BoardId, RowIndex, ColIndex)).

get_valid_move(BoardId, Position, Direction) :-
    board_empty(BoardId, EmptyRow, EmptyCol),
    valid_move(EmptyRow, EmptyCol, Position, Direction).

valid_move(EmptyRow, EmptyCol, [RowAbove, EmptyCol], up) :- EmptyRow > 1, RowAbove is EmptyRow - 1.
valid_move(EmptyRow, EmptyCol, [RowBelow, EmptyCol], down) :-
    get_total_colum(TotalColumns),
    EmptyRow < TotalColumns,
    RowBelow is EmptyRow + 1.

valid_move(EmptyRow, EmptyCol, [EmptyRow, ColLeft], left) :- EmptyCol > 1, ColLeft is EmptyCol - 1.
valid_move(EmptyRow, EmptyCol, [EmptyRow, ColRight], right) :-
    get_total_row(TotalRows),
    EmptyCol < TotalRows,
    ColRight is EmptyCol + 1.

apply_move_to_board(BoardId, Direction) :-
    apply_horizontal_move(BoardId, Direction);
    apply_vertical_move(BoardId, Direction).

apply_horizontal_move(BoardId, Direction) :-
    (Direction = left; Direction = right),
    get_valid_move(BoardId, [Row, NewCol], Direction),
    board_row(BoardId, Row, RowData),
    board_empty(BoardId, Row, EmptyCol),
    list_swap(RowData, EmptyCol, NewCol, UpdatedRow),
    update_board_row(BoardId, Row, UpdatedRow),
    add_empty_to_board(BoardId, Row, NewCol).

apply_vertical_move(BoardId, Direction) :-
    (Direction = up; Direction = down),
    get_valid_move(BoardId, [NewRow, Col], Direction),
    board_empty(BoardId, EmptyRow, Col),
    swap_vertical(BoardId, EmptyRow, Col, NewRow, Col),
    add_empty_to_board(BoardId, NewRow, Col).

generate_child_board(BoardId, ChildBoardId, Direction) :-
    member(Direction, [left, right, up, down]),
    clone_board(BoardId, ChildBoardId), 
    apply_move_to_board(ChildBoardId, Direction).

goal_row(1, [1, 2, 3, 4]).
goal_row(2, [5, 6, 7, 8]).
goal_row(3, [9, 10, 11, 12]).
goal_row(4, [13, 14, 15, empty]).

goal_reached(BoardId) :-
    goal_row(1, GoalRow1),
    goal_row(2, GoalRow2),
    goal_row(3, GoalRow3),
    board_row(BoardId, 1, GoalRow1),
    board_row(BoardId, 2, GoalRow2),
    board_row(BoardId, 3, GoalRow3).

start_astar(BoardId) :-
    clear_visited_boards,
    clear_goal_found,
    heuristic(BoardId, HValue),
    empty_heap(OpenHeap),
    add_to_heap(OpenHeap, HValue, [BoardId, 1, HValue, [], 1], UpdatedOpenHeap),
    astar(UpdatedOpenHeap).
%%%%%%%%%%%%%%%%%%%%%%%agregar
astar(OpenHeap) :-
    goal_found; goal_search(OpenHeap).

goal_search(OpenHeap) :-
    get_from_heap(OpenHeap, _, [BoardId, GValue, HValue, Path, Depth], RestHeap),
    display_search_state(HValue),
    ( goal_reached(BoardId) -> goal_achieved(Path, BoardId, Depth)
    ; process_board(BoardId, GValue, Path, Depth, RestHeap)
    ).

goal_achieved(Path, BoardId, Depth) :-
    generate_board_matrix(BoardId, M),
    assert(goal_metrics(1, Path, Depth, M)),
    assert(goal_found), !.

% Predicado principal para generar la matriz del tablero
generate_board_matrix(BoardId, M) :- 
    % Obtener todas las filas del tablero
    findall([RowIndex, Row], board_row(BoardId, RowIndex, Row), Rows),
    % Ordenar las filas por su índice
    sort(Rows, SortedRows),
    % Crear una lista con las filas del tablero
    build_matrix(SortedRows, Matrix),
    % Asignar la matriz resultante al parámetro M
    M = Matrix.

% Predicado auxiliar para construir la matriz a partir de las filas ordenadas
build_matrix([], []).
build_matrix([[_, Row]|Rest], [Row|MatrixRest]) :-
    build_matrix(Rest, MatrixRest).

process_board(BoardId, GValue, Path, Depth, RestHeap) :-
    \+ is_board_visited(BoardId),
    set_board_as_visited(BoardId),
    findall([ChildBoardId, ChildDirection], generate_child_board(BoardId, ChildBoardId, ChildDirection), Children),
    NewDepth is Depth + 1,
    expand_children(Children, GValue, Path, NewDepth, RestHeap, NewHeap),
    astar(NewHeap).

process_board(_, _, _, _, RestHeap) :-
    astar(RestHeap).

expand_children([], _, _, _, OpenHeap, OpenHeap).
expand_children([[ChildId, ChildDir]|RestChildren], GValue, Path, Depth, OpenHeap, NewHeap) :-
    heuristic(ChildId, HValue),
    NewGValue is GValue + 1,
    FValue is NewGValue + HValue,
    append(Path, [ChildDir], NewPath),
    add_to_heap(OpenHeap, FValue, [ChildId, NewGValue, HValue, NewPath, Depth], UpdatedHeap),
    expand_children(RestChildren, GValue, Path, Depth, UpdatedHeap, NewHeap).

display_search_state(HValue) :-
    retractall(heuristic()),
    assert(heuristic(HValue))
.

test_astar(InitialBoard, P, D, M, H) :-
    clear_visited_boards,
    clear_all_boards,
    create_board_from_list(InitialBoard, BoardId),
    start_astar(BoardId),
    goal_metrics(1, P, D, M),
    heuristic(H),
    !.
