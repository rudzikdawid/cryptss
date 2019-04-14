import {animate, group, query, style, transition, trigger} from "@angular/animations";

export const slideInAnimation =
    trigger('slideInAnimation', [
        transition('* <=> *', [
            query(':enter', [
                style({ transform: 'translateY(20%)'})
            ], { optional: true }),
            // query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('300ms ease-out', style({ opacity: 0}))
                ], { optional: true }),
                query(':enter', [
                    animate('300ms ease-out', style({ transform: 'translateX(0%)'}))
                ], { optional: true })
            ]),
            // query(':enter', animateChild()),
        ])
    ]);


export const myAnimation =
    trigger(
        'myAnimation',
        [
            transition(
                ':enter', [
                    style({opacity: 0}),
                    animate('500ms', style({'opacity': 1}))
                ]
            ),
            transition(
                ':leave', [
                    style({'opacity': 1}),
                    animate('500ms', style({'opacity': 0}))
                ]
            )]
    );

export const fadeAnimation =
    trigger('fadeAnimation', [
        transition( '* <=> *', [
            group([
                query(':leave .nav-icon',
                    [
                        style({ 'transform': 'rotate(0)', 'opacity': '1' }),
                        animate('200ms ease-in-out', style({ 'transform': 'rotate(180deg)', 'opacity': '0' }))
                    ],
                    { optional: true }
                ),
                query(':enter .nav-icon',
                    [
                        style({ 'transform': 'rotate(-180deg)', 'opacity': '0' }),
                        animate('200ms ease-in-out', style({ 'transform': 'rotate(0)', 'opacity': '1' }))
                    ],
                    { optional: true }
                ),
                query(':leave .rrr',
                    [
                        style({ opacity: 1 }),
                        animate('150ms ease-in', style({ opacity: 0 }))
                    ],
                    { optional: true }
                ),
                query(':enter .rrr',
                    [
                        style({ opacity: 0 }),
                        animate('150ms ease-out', style({ opacity: 1 }))
                    ],
                    { optional: true }
                )
            ])
        ])
    ]);
