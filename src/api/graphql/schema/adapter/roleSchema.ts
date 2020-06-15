import Base from './Base'

// Same code as in FileAsync, minus `await`
class RoleSchema extends Base {
  read() {
    return this.source.prisma.roleSchema.findOne({
      where: {
        name: this.source.name
      }
    }).then((data) => {
      return JSON.parse(data.json)
    })
  }

  write(data) {
    return this.source.prisma.roleSchema.update({
      where: { name: this.source.name },
      data: {
        json: JSON.stringify(data)
      }
    }).then((data) => {
      return JSON.parse(data.json)
    })
  }
}
export default RoleSchema