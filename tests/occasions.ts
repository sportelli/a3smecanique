import {Selector} from 'testcafe';

fixture `Machines d'occasions`
    .page `http://localhost:3001`;

test('Test titre', async t => {
    await t
        .click('#machines-doccasion')
        .expect(Selector('body').find('h1').innerText).eql("Machines occasions");
});

test('Test plusieurs machines', async t => {
    await t
        .click('#machines-doccasion')
        .expect(Selector('body').find('h2').count).gt(2);
});
