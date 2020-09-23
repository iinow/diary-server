import { EntityRepository, Repository } from 'typeorm'
import { Book } from '~/model'

@EntityRepository()
class BookRepository extends Repository<Book> {

}

export default BookRepository
