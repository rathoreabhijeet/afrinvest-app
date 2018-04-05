
import { Shares, SharesInterface } from "../models/Shares";
import { LIMIT } from "../app.config";
import { Request, Response, NextFunction } from "express";
import { WriteError } from "mongodb";
import * as _ from "lodash";
import {
    Schema,
    model,
    PaginateModel,
    PaginateOptions,
    PaginateResult,
    Document
} from 'mongoose';
import * as request from "request";
import * as fs from "fs";
/**
 * GET /shares
 * Login page.
 */
export let getShares = (req: Request, res: Response) => {
    Shares.paginate({

    }, {
            page: req.query.page,
            limit: LIMIT,
            sort: { createdAt: -1}
        }, (err: any, shares: PaginateResult<SharesInterface>) => {
            if (err) { return res.status(400).send(err); }
            return res.status(200).send({
                shares: shares,
                msg: "Get shares list"
            });
        });
};

/**
 * POST /shares
 * Create a new shares.
 */
export let postShares = (req: Request, res: Response, next: NextFunction) => {
    const errors = req.validationErrors();
    if (errors) {
        req.flash("errors", errors);
        return res.status(400).send(errors)
    }
    req.body.user_id = req.user._id;
    delete req.body.change_value;
    delete req.body.change_percentage;
    const shares = new Shares(req.body);
    shares.save((err) => {
        if (err) { return res.status(400).send(err); }
        res.status(200).send({
            shares: shares,
            msg: 'Shares added successfully.'
        });
    });
};

/**
 * PUT /shares/:id
 * Update shares information.
 */
export let postUpdateShares = (req: Request, res: Response, next: NextFunction) => {
    Shares.findById(req.params.id, (err, shares: SharesInterface) => {
        if (err) { return res.status(400).send(err); }
        req.body.company_name ? shares.company_name = req.body.company_name : "";
        req.body.company_abbreviation ? shares.company_abbreviation = req.body.company_abbreviation : "";
        req.body.status ? shares.status = req.body.status : "";
       
        req.body.market_capacity ? shares.market_capacity = req.body.market_capacity : "";
        if (typeof req.body.price === 'number') {
            shares.change_value.value = req.body.price - shares.price;
            shares.change_percentage.value = ((req.body.price - shares.price) / shares.price) * 100;
            shares.change_value.value < 0 ? (shares.change_value.sign = 'minus', shares.change_percentage.sign = 'minus') : (shares.change_value.sign = 'plus', shares.change_percentage.sign = 'plus');
            shares.change_value.value = parseFloat(Math.abs(shares.change_value.value).toFixed(2));
            shares.change_percentage.value = parseFloat(Math.abs(shares.change_percentage.value).toFixed(2));
        }
        req.body.price ? shares.price = req.body.price : "";
        shares.save((err: WriteError, updatedShares) => {
            if (err) {
                if (err.code === 11000) {
                    return res.status(400).send(err);
                }
                return res.status(400).send(err);
            }
            return res.status(200).send({
                shares: shares,
                msg: "Shares information has been updated."
            });
        });
    });
};

/**
 * DELETE /shares/:id
 * Delete shares.
 */
export let postDeleteShares = (req: Request, res: Response, next: NextFunction) => {
    Shares.remove({ _id: req.params.id }, (err) => {
        if (err) { return res.status(400).send(err) }
        res.status(200).send({ msg: "Your shares has been deleted." });
    });
};