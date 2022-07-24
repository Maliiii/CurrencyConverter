import { CurrencyService } from './service/currency-service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'currencyCalculator';
  currencies = [];
  conversionLeft = 1.0059;
  conversionRight = 1.0059;
  selectedValueRight = 'USD';
  selectedValueLeft = 'USD';

  public form = new FormGroup({
    inputLeft: new FormControl('inputLeft'),
    inputRight: new FormControl('inputRight')
  });

constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe(currenciesFromServer => {

    const arr = Object.keys(currenciesFromServer).map((key) => key);
    this.currencies = arr;
    });

    this.initialiseFormGroup();

  }

  get inputLeftFromForm() {
    return this.form.get('inputLeft');
  }

  get inputRightFromForm() {
    return this.form.get('inputRight');
  }

  public calculate(inputField: string): void {

    if (inputField === 'inputLeft'){
      this.form.get('inputRight').setValue(this.roundValue((this.form.get('inputLeft').value / this.conversionLeft)
      * this.conversionRight));
    } else {
      this.form.get('inputLeft').setValue(this.roundValue((this.form.get('inputRight').value / this.conversionRight)
      * this.conversionLeft));
    }
  }

  initialiseFormGroup(): void {
    const {inputLeft, inputRight} = this.form.controls;
    inputLeft.setValue(1);
    inputRight.setValue(1);
  }

  selectCountry(inputField: string): void {
    let url = '';
    if (inputField === 'inputLeft') {
      url = this.selectedValueLeft.toString();
    } else {
      url = this.selectedValueRight.toString();
    }

    this.currencyService.getSingleCurrencyConversion(url).subscribe(conversionRate =>
      {
        const arr = JSON.parse(JSON.stringify(conversionRate));
        if (inputField === 'inputLeft') {
          this.conversionLeft = arr[this.selectedValueLeft.toString()];
          console.log(this.conversionLeft);
        } else {
          this.conversionRight = arr[this.selectedValueRight.toString()];
          console.log(this.conversionRight);
        }
        this.calculate(inputField);
      });
  }

  roundValue(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}



