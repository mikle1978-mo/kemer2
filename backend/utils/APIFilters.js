class APIFilters {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr || {};
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                  name: {
                      $regex: this.queryStr.keyword,
                      $options: "i",
                  },
              }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        // Remove fields that are not needed
        const removeFields = ["keyword", "page"];
        removeFields.forEach((el) => delete queryCopy[el]);

        let output = {};
        let prop = "";

        for (let key in queryCopy) {
            if (queryCopy[key] == null) continue;

            if (!key.match(/\b(gt|gte|lt|lte)/)) {
                output[key] = queryCopy[key];
            } else {
                prop = key.split("[")[0];
                let operator = key.match(/\[(.*)\]/)[1];

                if (!output[prop]) {
                    output[prop] = {};
                }

                output[prop][`$${operator}`] = queryCopy[key];
            }
        }

        this.query = this.query.find(output);

        // Apply sellerId filter if provided
        if (this.queryStr.sellerId) {
            this.query = this.query.find({ sellerId: this.queryStr.sellerId });
        }

        return this;
    }
}

export default APIFilters;
