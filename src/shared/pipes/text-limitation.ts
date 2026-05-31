import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'limitLength',
    standalone: true,
})

export class LimitationString implements 
PipeTransform {
    transform(text: string | null | undefined): string {
        if (!text) return '';
        return text.length > 50 ?
    text.slice(0, 53) + '...' : text;
    }
}