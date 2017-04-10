import { SLOptionsPage } from './sl-options/sl-options';
import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PopoverController } from 'ionic-angular';

import { ShoppingListService } from "../../services/shopping-list";
import { Ingredient } from "../../models/ingredient";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(private slService: ShoppingListService, private popoverController: PopoverController) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  onShowOptions(event: MouseEvent) {
    const popover = this.popoverController.create(SLOptionsPage);
    popover.present({ev: event});
  }

  private loadItems() {
    this.listItems = this.slService.getItems();
  }
}
