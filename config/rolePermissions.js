const rolePermissions = {
  "admin": {
              "categories": [
                              "index",
                              "show",
                              "create",
                              "update",
                              "delete"
                            ],
              "items": [
                          "index",
                          "show",
                          "create",
                          "update",
                          "delete"
                       ],
              "users": [ 
                         "index",
                         "show",
                         "create",
                         "update",
                         "delete"
                       ],
              "roles": [
                        "index",
                        "show",
                        "create",
                        "update",
                        "delete"
                       ],
            },
  "clerk": {
              "categories": [
                              "index",
                              "show",
                              "create",
                              "update",
                              "delete"
                            ],
              "items": [
                          "index",
                          "show",
                          "create",
                          "update",
                          "delete"
                       ],
              "users": [
                          "index",
                          "show",
                          "create",
                          "update",
                          "delete"
                       ],
              "roles": [
                          "index",
                          "show",
                          "create",
                          "update",
                          "delete"
                       ],
            },
  "customer": { 
                 "items": [
                             "index",
                             "show"
                          ]
              }
};

export default rolePermissions

// this could also be done like this

// export default {
//   "admin": { "items":["index","show","create","update"]},
//   "clerk": { "items":["index","show","create","update"]},
//   "customer": { "items":["index","show"]}
// };