interface Cells{
    deadcells:DeadCell,
    cellsLive:CellsLive


}


class CellsLive implements Cells {
    next(listCellsNeighbours: DeadCell[]):Cells{
        const numberOfLivingCells=listCellsNeighbours.filter(cell=>cell instanceof CellsLive ).length;
        if (numberOfLivingCells===2||numberOfLivingCells===3) return new CellsLive();
        return new DeadCell()

    }

    cellsLive: CellsLive;
    deadcells: DeadCell;
}

class DeadCell implements Cells {
    next(listCellsNeighbours: CellsLive[]):Cells{
        const numberOfLivingCells=listCellsNeighbours.filter(cell=>cell instanceof CellsLive ).length;
        if (numberOfLivingCells===3) return new CellsLive();
        return new DeadCell();
    }

    cellsLive: CellsLive;
    deadcells: DeadCell;
}

describe('test jeu de la vie', function () {
    it('Should return dead when   less than two living neighbours', function () {
        //Given
        const cellsLive= new CellsLive();
        const listCellsNeighbours=[new DeadCell()];

        //when
        const nextCell=cellsLive.next(listCellsNeighbours);

        //then
        expect(nextCell).toBeInstanceOf(DeadCell)
    });
    it('Should  stay alive with two living neighbours', function () {
        //Given
        const cellsLive= new CellsLive();
        const listCellsNeighbours=[new CellsLive(),new CellsLive()];

        //when
        const nextCell=cellsLive.next(listCellsNeighbours);

        //then
        expect(nextCell).toBeInstanceOf(CellsLive)
    });

    it('Should  stay alive with three living neighbours', function () {
        //Given
        const cellsLive= new CellsLive();
        const listCellsNeighbours=[new CellsLive(),new CellsLive(),new CellsLive()];

        //when
        const nextCell=cellsLive.next(listCellsNeighbours);

        //then
        expect(nextCell).toBeInstanceOf(CellsLive)
    });
    it('Should died when more than three living neighbours', function () {
        //Given
        const cellsLive= new CellsLive();
        const listCellsNeighbours=[new CellsLive(),new CellsLive(),new CellsLive(),new CellsLive()];

        //when
        const nextCell=cellsLive.next(listCellsNeighbours);

        //then
        expect(nextCell).toBeInstanceOf(DeadCell)
    });

    it('Should dead cells with  three living neighbours become alive', function () {
        //Given
        const cellsDead= new DeadCell();
        const listCellsNeighbours=[new CellsLive(),new CellsLive(),new CellsLive()];

        //when
        const nextCell=cellsDead.next(listCellsNeighbours);

        //then
        expect(nextCell).toBeInstanceOf(CellsLive)
    });
    it('Should stay dead  when do not have  three living neighbours ', function () {
        //Given
        const cellsDead= new DeadCell();
        const listCellsNeighbours=[new CellsLive(),new CellsLive()];

        //when
        const nextCell=cellsDead.next(listCellsNeighbours);

        //then
        expect(nextCell).toBeInstanceOf(DeadCell)
    });
});
