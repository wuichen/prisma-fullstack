export default function userHandler(req, res) {
  const {
    query: { type, resource, page },
    method,
  } = req
  console.log(page)

  if (type === 'functions') {
    if (resource === 'get-page') {
      res.status(200).json({
        html: '',
        allowEdit: false,
        token: '',
        page
      })
    }
  }

  // switch (method) {
  //   case 'GET':
  //     // Get data from your database
  //     res.status(200).json({ id, name: `User ${id}` })
  //     break
  //   case 'PUT':
  //     // Update or create data in your database
  //     res.status(200).json({ id, name: name || `User ${id}` })
  //     break
  //   default:
  //     res.setHeader('Allow', ['GET', 'PUT'])
  //     res.status(405).end(`Method ${method} Not Allowed`)
  // }
}