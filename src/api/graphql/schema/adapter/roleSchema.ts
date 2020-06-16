import Base from './Base'

// Same code as in FileAsync, minus `await`
class RoleSchema extends Base {
  read() {
    return this.source.prisma.role.findOne({
      where: {
        name: this.source.name
      }
    }).then((data) => {
      return JSON.parse(data.schema)
    })
  }

  write(data) {
    return this.source.prisma.role.update({
      where: { name: this.source.name },
      data: {
        schema: JSON.stringify(data)
      }
    }).then((data) => {
      return JSON.parse(data.schema)
    })
  }
}
export default RoleSchema