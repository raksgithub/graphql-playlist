import { map as _map } from 'lodash';
import { get as _get } from 'lodash';

const mapBookTableData = bookTableData => {
    const bookData = _map(bookTableData, data => {
        return {
            name: _get(data, 'name'),
            genre: _get(data, 'genre'),
            authorName: _get(data, 'author.name'),
            authorAge: _get(data, 'author.age')
        };
    });
    return bookData;
}

export { mapBookTableData };