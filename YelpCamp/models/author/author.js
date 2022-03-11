const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const AuthorSchema = new Schema({
    kind: {
        type: String,
        default: "collectionType"
    },
    collectionName: {
        type: String,
        default: "authors"
    },
    // TODO
    // options: {

    // }
    attributes: {
        "attributes": {
            "avatar": {
                "model": {
                    type: String,
                    default: "file"
                },
                "via": {
                    type: String,
                    default: "related"
                }
            }
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    social: {
        type: String,
        required: true
    },
    wallet: {
        type: String,
        required: true,
    },
    nfts: {
        "via": {
            type: String,
            default: "author"
        },
        "collection": {
            type: String,
            default: "nft"
        }
    },
    //TODO
    // "author_sale": {
    //     "model": "author-sales"
    //   },
    //   "hot_collections": {
    //     "via": "author",
    //     "collection": "hot-collection"
    //   }
    email: {
        type: String,
        required: true,
        unique: true
    }
});

AuthorSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Author', AuthorSchema);