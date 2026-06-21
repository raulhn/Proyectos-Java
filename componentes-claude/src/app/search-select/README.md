# Usage example
# -----------------
# In any component template you can use the new select like this:
#
# <app-search-select
#   [options]="['Red', 'Green', 'Blue', 'Yellow']"
#   placeholder="Choose a color"
#   (selectionChange)="onColorSelect($event)"
# ></app-search-select>
#
# And in the corresponding component TS:
#
# onColorSelect(color: string) {
#   console.log('Selected', color);
# }
